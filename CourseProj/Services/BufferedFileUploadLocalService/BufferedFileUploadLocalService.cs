using System.Globalization;

namespace CourseProj.Services;

public class BufferedFileUploadLocalService : IBufferedFileUploadLocalService
{
    public bool IsCsvFile(IFormFile file)
    {
        if(file == null) return false;
        var name = file.ContentType;
        if (file.ContentType != "text/csv") return false;
        return true;
    }
    
    public async Task<string> UploadFile(IFormFile file)
    {
    
        if (Path.GetExtension(file.FileName) != ".csv") return "";
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
                    await file.CopyToAsync(fileStream);
            }
        }
        catch (Exception ex)
        {
            throw new Exception("File Copy Failed", ex);
        }
        return Path.Combine(path, file.FileName);
    }
}