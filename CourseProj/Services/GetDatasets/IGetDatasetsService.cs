using System.Collections;

namespace CourseProj.Services;

public interface IGetDatasetsService
{
    Task <IEnumerable> GetFiles();
}