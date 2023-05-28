namespace CourseProj.Models.Calculating;

public class FinalObject
{
    public string Interval { get; set; }
    public double? Avg { get; set; }
    public int? Count { get; set; }
    public double? Data { get; set; }
    public double Gaus { get; set; }
    public double? TeorChastota { get; set; }
    public FinalObject(string interval,double? avg, int? count, double data, double gaus, double? teorChastota)
    {
        Interval = interval;
        Avg = avg;
        Count = count;
        Data = data;
        Gaus = gaus;
        TeorChastota = teorChastota;
    }
}