namespace CourseProj.Services;

public interface IBufferedFileUploadLocalService
{
    Task<bool> UploadFile(IFormFile file);
}