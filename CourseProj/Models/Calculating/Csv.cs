using CsvHelper.Configuration.Attributes;

namespace CourseProj.Models.Calculating;

public class Csv
{
    [Name("Gender")]
    public string Gender { get; set; }
    [Name("Height")]
    public double Height { get; set; }
    [Name("Weight")]
    public double Weight { get; set; }
}