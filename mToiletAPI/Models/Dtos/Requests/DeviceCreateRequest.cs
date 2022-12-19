namespace mToiletAPI.Models.Dtos.Requests
{
    public class DeviceCreateRequest
    {
        public string DeviceName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
