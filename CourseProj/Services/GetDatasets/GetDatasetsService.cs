using System.Collections;
using System.IO;
using CourseProj.Views.Dashboard.Models;

namespace CourseProj.Services;

public class GetDatasetsService : IGetDatasetsService
{
    public async Task<IEnumerable> GetFiles()
    {
        var actualDataSets = new List<SideBarDatasets>();
        if (!Path.Exists(Environment.CurrentDirectory + "\\UploadedFiles"))
        {
            actualDataSets = null;
            return actualDataSets;
        }

        await Task.Run(() =>
        {
            DirectoryInfo dir = new DirectoryInfo(Environment.CurrentDirectory + "\\UploadedFiles");
            FileInfo[] files = dir.GetFiles("*.csv");
            
            foreach (FileInfo file in files)
            {
                actualDataSets.Add(new SideBarDatasets()
                {
                    FileName = file.Name,
                    FilePath = Path.Combine(Environment.CurrentDirectory, "UploadedFiles", file.Name).Replace(@"\", @"\\"),
                });
            }
        });
        if (actualDataSets.Count == 0)
        {
            actualDataSets = null;
            return actualDataSets;
        }
        return actualDataSets;
    }
}