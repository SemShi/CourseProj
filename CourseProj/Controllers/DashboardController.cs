using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using CourseProj.Models;
using CourseProj.Services;
using CourseProj.Enums;

namespace CourseProj.Controllers;

public class DashboardController : Controller
{
    private readonly ILogger<DashboardController> _logger;
    private readonly IBufferedFileUploadLocalService _bufferedFileUploadService;
    private readonly IRaschetDannih _raschetDannih;
    private readonly IGetDatasetsService _getDatasetsService;

    public DashboardController(
        ILogger<DashboardController> logger, 
        IBufferedFileUploadLocalService bufferedFileUploadService,
        IRaschetDannih raschetDannih,
        IGetDatasetsService getDatasetsService)
    {
        _logger = logger;
        _bufferedFileUploadService = bufferedFileUploadService;
        _raschetDannih = raschetDannih;
        _getDatasetsService = getDatasetsService;
    }

    public async Task<IActionResult> Index()
    {
        ViewBag.Result = false;
        ViewBag.model = await _getDatasetsService.GetFiles();
        return View();
    }

    [HttpGet]
    public async Task<string> GetFiles()
    {
        var fileList = await _getDatasetsService.GetFiles();
        return JsonSerializer.Serialize(fileList);
    }

    [HttpPost]
    public async Task<FileOperationResult> DeleteFile(string filePath)
    {
        return await _getDatasetsService.DeleteFile(filePath);
    }

    [HttpPost]
    public async Task<string> GetData(FormData formData)
    {
        string filePath = "";
        if (formData.Source == "client")
        {
            if (!_bufferedFileUploadService.IsCsvFile(formData.file)) throw new Exception("Неверный формат файла");
            filePath = await _bufferedFileUploadService.UploadFile(formData.file);
        }
        else
            filePath = formData.FilePath!;

        var firstData = formData.Param == "Weight" ? 
            await _raschetDannih.GetHeight(filePath, formData.Gender) : 
            await _raschetDannih.GetWeight(filePath, formData.Gender);
        var result = _raschetDannih.GetDataToNormalRaspred(firstData);
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