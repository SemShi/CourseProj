using System.Globalization;
using CourseProj.Models.Calculating;
using CsvHelper;

namespace CourseProj.Services.AnalyzeDataset;

public class RaschetDannih : IRaschetDannih
{
    public ResultData GetDataToNormalRaspred(List<FirstDataObject> list)
        {
            ResultData resultData = new ResultData();
            resultData.ViborSred = Math.Round((double)(list.Sum(elem => elem.MultCountAvg) / list.Sum(elem => elem.Count)), 2);
            resultData.Otclon = Math.Round(Math.Sqrt((double)(list.Sum(elem => elem.MultCountPowAvg) / list.Sum(elem => elem.Count)) - Math.Pow(resultData.ViborSred, 2)), 2);

            double data;
            double gaus;
            double teorChastota;
            resultData.NabludZnach = 0;
            List<FinalObject> result = new List<FinalObject>();
            resultData.KriteriyPirsona = list.Count - 3;
            for (int i = 0; i < list.Count(); i++)
            {
                data = Math.Round((double)(list[i].Avg - resultData.ViborSred) / resultData.Otclon, 2);
                gaus = Math.Round(1 / Math.Sqrt(2 * Math.PI) * Math.Pow(Math.E, -Math.Pow(data, 2) / 2), 2);
                teorChastota = Math.Round((double)(FirstDataObject.shag * list.Sum(elem => elem.Count) / resultData.Otclon) * gaus, 2);
                if(teorChastota > 0)
                {
                    resultData.NabludZnach += Math.Round(Math.Pow((double)list[i].Count - teorChastota, 2) / teorChastota, 2);
                    result.Add(new FinalObject(list[i].Interval, list[i].Avg, list[i].Count, data, gaus, teorChastota));
                }
            }

            resultData.finalObjectsList = result;

            return resultData;
        }

        public async Task<List<FirstDataObject>> GetHeight(string filePath, string gender)
        {
            using (var streamreader = new StreamReader(filePath))
            {
                using (var csvReader = new CsvReader(streamreader, CultureInfo.InvariantCulture))
                {
                    var list = csvReader.GetRecords<Csv>().Where(el => el.Gender == gender).ToList();
                    int interval = (int)Math.Pow((10 * list.Count), (double)1 / 3);
                    FirstDataObject.shag = (list.Max(elem => elem.Height) - list.Min(elem => elem.Height)) / interval;
                    List<FirstDataObject> result = new List<FirstDataObject>();
                    int count;
                    double avg;
                    for (double i = list.Min(elem => elem.Height); i < list.Max(elem => elem.Height) - FirstDataObject.shag; i += FirstDataObject.shag)
                    {
                        avg = Math.Round((i + (i + FirstDataObject.shag)) / 2, 2);
                        count = list.Where(elem => elem.Height > i && elem.Height <= i + FirstDataObject.shag).Count();
                        if(count > 0) 
                            result.Add(new FirstDataObject($"{Math.Round(i,2)}-{Math.Round(i + FirstDataObject.shag,2)}", count, avg, Math.Round(avg * count,2), Math.Round(Math.Pow(avg, 2) * count, 2)));
                    }
                    return result;
                }
            }
        }

        public async Task<List<FirstDataObject>> GetWeight(string filePath, string gender)
        {
            using (var streamreader = new StreamReader(filePath))
            {
                using (var csvReader = new CsvReader(streamreader, CultureInfo.InvariantCulture))
                {
                    var list = csvReader.GetRecords<Csv>().Where(el => el.Gender == gender).ToList();
                    int interval = (int)Math.Pow((10 * list.Count), (double)1 / 3);
                    FirstDataObject.shag = (list.Max(elem => elem.Weight) - list.Min(elem => elem.Weight)) / interval;
                    List<FirstDataObject> result = new List<FirstDataObject>();
                    int count;
                    double avg;
                    for (double i = list.Min(elem => elem.Weight); i < list.Max(elem => elem.Weight) - FirstDataObject.shag; i += FirstDataObject.shag)
                    {
                        avg = Math.Round((i + (i + FirstDataObject.shag)) / 2, 2);
                        count = list.Where(elem => elem.Weight > i && elem.Weight <= i + FirstDataObject.shag).Count();
                        if (count > 0) result.Add(new FirstDataObject($"{Math.Round(i, 2)}-{Math.Round(i + FirstDataObject.shag, 2)}", count, avg, Math.Round(avg * count, 2), Math.Round(Math.Pow(avg, 2) * count, 2)));
                    }
                    return result;
                }
            }
        }
}