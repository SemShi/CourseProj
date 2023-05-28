using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using CourseProj.Models;
using CourseProj.Services;
using CourseProj.Services.AnalyzeDataset;

namespace CourseProj.Controllers;

public class DashboardController : Controller
{
    private readonly ILogger<DashboardController> _logger;
    private readonly IBufferedFileUploadLocalService _bufferedFileUploadService;
    private readonly IRaschetDannih _raschetDannih;

    public DashboardController(
        ILogger<DashboardController> logger, 
        IBufferedFileUploadLocalService bufferedFileUploadService,
        IRaschetDannih raschetDannih)
    {
        _logger = logger;
        _bufferedFileUploadService = bufferedFileUploadService;
        _raschetDannih = raschetDannih;
    }

    public IActionResult Index()
    {
        ViewBag.Result = false;
        return View();
    }
    
    [HttpPost]
    public async Task<string> GetData(FormData formData)
    {
        if (!_bufferedFileUploadService.IsCsvFile(formData.file)) throw new Exception("Неверный формат файла");
        string filePath = await _bufferedFileUploadService.UploadFile(formData.file);
        var firstDatas = formData.Param == "Weight" ? 
            await _raschetDannih.GetHeight(filePath, formData.Gender) : 
            await _raschetDannih.GetWeight(filePath, formData.Gender);
        var result = _raschetDannih.GetDataToNormalRaspred(firstDatas);
        return JsonSerializer.Serialize(result);
    }
    
    public IActionResult About()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}