namespace CourseProj.Models.Calculating;

public class FirstDataObject
{
    public static double shag { get; set; }
    public string Interval { get; set; }
    public int? Count { get; set; }
    public double? Avg { get; set; }
    public double? MultCountAvg { get; set; }
    public double? MultCountPowAvg { get; set; }
    public FirstDataObject(string interval, int count, double avg, double multCountAvg, double multCountPowAvg)
    {
        Interval = interval;
        Count = count;
        Avg = avg;
        MultCountAvg = multCountAvg;
        MultCountPowAvg = multCountPowAvg;
    }
}