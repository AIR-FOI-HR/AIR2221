using Microsoft.Extensions.Logging;
using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Dtos.Responses;
using mToiletAPI.Models.Entities;
using mToiletAPI.Persistence;

namespace mToiletAPI.Services
{
    public class EventService
    {
        private AppDbContext _context;

        public EventService(AppDbContext context)
        {
            _context = context;
        }

        public List<EventResponse> GetAllEvents()
        {
            List<EventResponse> list = new List<EventResponse>();
            List<Event> items = _context.Events.ToList();

            foreach (var item in items) 
            {
                EventResponse entity = new EventResponse();
                entity.Id = item.Id;
                entity.Date = item.Date;
                entity.UserId = item.UserId;
                entity.DeviceId = item.DeviceId;
                list.Add(entity);
            }
            return list;
        }

        public Event CreateEvent(EventCreateRequest events)
        {
            var entity = new Event();
            entity.Date = DateTime.UtcNow;
            entity.UserId = events.UserId;
            entity.DeviceId = events.DeviceId;

            _context.Events.Add(entity);
            _context.SaveChanges();

            return entity;
        }
    }
}
