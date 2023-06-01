using System.Collections;
using CourseProj.Enums;
namespace CourseProj.Services;

public interface IGetDatasetsService
{
    Task <IEnumerable?> GetFiles();
    Task<FileOperationResult> DeleteFile(string filePath);
}