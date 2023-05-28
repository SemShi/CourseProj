namespace CourseProj.Services;

public interface IBufferedFileUploadLocalService
{
    Task<string> UploadFile(IFormFile file);
    bool IsCsvFile(IFormFile file);
}