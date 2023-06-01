using System.Collections;
using System.IO;
using CourseProj.Views.Dashboard.Models;
using CourseProj.Enums;

namespace CourseProj.Services;

public class GetDatasetsService : IGetDatasetsService
{
    private readonly string _slash = Path.DirectorySeparatorChar.ToString();
    public async Task<IEnumerable?> GetFiles()
    {
        var actualDataSets = new List<SideBarDatasets>();
        if (!Path.Exists(Environment.CurrentDirectory + $"{_slash}UploadedFiles"))
            return null;

        await Task.Run(() =>
        {
            DirectoryInfo dir = new DirectoryInfo(Environment.CurrentDirectory + $"{_slash}UploadedFiles");
            FileInfo[] files = dir.GetFiles("*.csv");
            
            foreach (FileInfo file in files)
            {
                actualDataSets.Add(new SideBarDatasets()
                {
                    FileName = file.Name,
                    FilePath = Path.Combine(Environment.CurrentDirectory, "UploadedFiles", file.Name).Replace(@$"{_slash}", @$"{_slash}{_slash}")
                });
            }
        });
        if (actualDataSets.Count == 0)
            return null;
        return actualDataSets;
    }

    public async Task<FileOperationResult> DeleteFile(string filePath)
    {
        bool isSuccess = false;
        await Task.Run(() =>
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                isSuccess = true;
            }
            else isSuccess = false;
        });
        return isSuccess ? 
            FileOperationResult.Success : 
            FileOperationResult.Error;
    }
}