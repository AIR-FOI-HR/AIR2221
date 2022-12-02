namespace mToiletAPI.Models.Entities
{
    public class Device
    {
        public int Id { get; set; }
        public string DeviceName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime LastSync { get; set; }
    }
}
