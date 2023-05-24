namespace CourseProj.Services;

public class BufferedFileUploadLocalService : IBufferedFileUploadLocalService
{
    public async Task<bool> UploadFile(IFormFile file)
    {
    
        if (Path.GetExtension(file.FileName) != ".csv") return false;
        string path = "";
        try
        {
            if (file.Length > 0)
            {
                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "UploadedFiles"));
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return true;
            }
            else
                return false;
        }
        catch (Exception ex)
        {
            throw new Exception("File Copy Failed", ex);
        }
    }
}