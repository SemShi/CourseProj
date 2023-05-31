using System.Collections;
using System.IO;
using CourseProj.Views.Dashboard.Models;

namespace CourseProj.Services;

public class GetDatasetsService : IGetDatasetsService
{
    private char Slash = Path.DirectorySeparatorChar;
    public async Task<IEnumerable?> GetFiles()
    {
        var actualDataSets = new List<SideBarDatasets>();
        if (!Path.Exists(Environment.CurrentDirectory + $"{Slash}UploadedFiles"))
            return null;

        await Task.Run(() =>
        {
            DirectoryInfo dir = new DirectoryInfo(Environment.CurrentDirectory + $"{Slash}UploadedFiles");
            FileInfo[] files = dir.GetFiles("*.csv");
            
            foreach (FileInfo file in files)
            {
                actualDataSets.Add(new SideBarDatasets()
                {
                    FileName = file.Name,
                    FilePath = Path.Combine(Environment.CurrentDirectory, "UploadedFiles", file.Name).Replace(@$"{Slash}", @$"{Slash}{Slash}"),
                });
            }
        });
        if (actualDataSets.Count == 0)
            return null;
        return actualDataSets;
    }
}