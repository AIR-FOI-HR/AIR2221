using mToiletAPI.Models.Entities;

namespace mToiletAPI.Models.Dtos.Responses
{
    public class EventResponse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public int DeviceId { get; set; }
    }
}
