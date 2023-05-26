using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CourseProj.Models;
using CourseProj.Services;

namespace CourseProj.Controllers;

public class DashboardController : Controller
{
    private readonly ILogger<DashboardController> _logger;
    private readonly IBufferedFileUploadLocalService _bufferedFileUploadService;

    public DashboardController(
        ILogger<DashboardController> logger, 
        IBufferedFileUploadLocalService bufferedFileUploadService)
    {
        _logger = logger;
        _bufferedFileUploadService = bufferedFileUploadService;
    }

    public IActionResult Index()
    {
        ViewBag.Result = false;
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> Index(IFormFile file)
    {
        try
        {
            _logger.LogInformation("Start upload file " + file.FileName);
            if (await _bufferedFileUploadService.UploadFile(file))
            {
                ViewBag.Message = "Файл успешно загружен.";
                ViewBag.Result = true;
                _logger.LogInformation("File " + file.FileName + " successfully uploaded!");
            }
            else
            {
                ViewBag.Message = "Возникла ошибка при загрузке файла";
                ViewBag.Result = false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            ViewBag.Message = "File Upload Failed";
            ViewBag.Result = false;
        }
        return View();
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