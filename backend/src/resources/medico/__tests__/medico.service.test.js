const { listarMedicos } = require('../medico.service');
const prisma = require('../../../config/prisma');

jest.mock('../../../config/prisma', () => ({
  prisma: {
    medico: {
      findMany: jest.fn()
    }
  }
}));

describe('listarMedicos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of doctors when search is successful', async () => {
    const mockMedicos = [
      { id: 1, nome: 'Dr. Silva' },
      { id: 2, nome: 'Dr. Santos' }
    ];
    
    prisma.medico.findMany.mockResolvedValue(mockMedicos);
    
    const result = await listarMedicos('Dr');
    
    expect(prisma.medico.findMany).toHaveBeenCalledWith({
      where: {
        nome: {
          contains: 'Dr'
        }
      }
    });
    expect(result).toEqual(mockMedicos);
  });

  it('should return empty array when no doctors found', async () => {
    prisma.medico.findMany.mockResolvedValue([]);
    
    const result = await listarMedicos('NonexistentDoctor');
    
    expect(result).toEqual([]);
  });

  it('should return error object when database query fails', async () => {
    prisma.medico.findMany.mockRejectedValue(new Error('Database error'));
    
    const result = await listarMedicos('Dr');
    
    expect(result).toEqual({ error: 'Erro ao listar médicos' });
  });

  it('should handle search with empty string', async () => {
    const mockMedicos = [
      { id: 1, nome: 'Dr. Silva' },
      { id: 2, nome: 'Dr. Santos' }
    ];
    
    prisma.medico.findMany.mockResolvedValue(mockMedicos);
    
    const result = await listarMedicos('');
    
    expect(prisma.medico.findMany).toHaveBeenCalledWith({
      where: {
        nome: {
          contains: ''
        }
      }
    });
    expect(result).toEqual(mockMedicos);
  });
});
