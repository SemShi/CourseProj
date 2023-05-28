using CourseProj.Models.Calculating;

namespace CourseProj.Services.AnalyzeDataset;

public interface IRaschetDannih
{
    public Task<List<FirstDataObject>> GetWeight(string filePath, string gender);
    public Task<List<FirstDataObject>> GetHeight(string filePath, string gender);
    public ResultData GetDataToNormalRaspred(List<FirstDataObject> list);
}