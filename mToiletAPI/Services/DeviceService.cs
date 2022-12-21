using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Entities;
using mToiletAPI.Persistence;

namespace mToiletAPI.Services
{
    public class DeviceService
    {
        private AppDbContext _context;

        public DeviceService(AppDbContext context)
        {
            _context = context;
        }

        public List<Device> GetAllDevices()
        {
            return _context.Devices.ToList();
        }



        public Device GetDeviceById(int id)
        {
            var device = _context.Devices.FirstOrDefault(x => x.Id == id);
            if (device != null)
            {
                var response = new Device();
                response.Id = device.Id;
                response.DeviceName = device.DeviceName;
                response.Latitude = device.Latitude;
                response.Longitude = device.Longitude;
                response.LastSync= device.LastSync;

                return response;
            }
            throw new ArgumentNullException(nameof(device));
        }



        public Device CreateDevice(DeviceCreateRequest device)
        {
            var entity = new Device();
            entity.DeviceName = device.DeviceName;
            entity.Latitude = device.Latitude;
            entity.Longitude = device.Longitude;
            entity.LastSync = null;

            _context.Devices.Add(entity);
            _context.SaveChanges();

            return entity;
        }



        public void SaveDeviceById(int id, DeviceCreateRequest device)
        {
            var entityDevice = _context.Devices.Where(x => x.Id == id).FirstOrDefault();

            if (device == null)
            {
                throw new ArgumentNullException("Device was not found");
            }

            entityDevice.DeviceName = device.DeviceName;
            entityDevice.Latitude = device.Latitude;
            entityDevice.Longitude = device.Longitude;

            _context.Update(entityDevice);
            _context.SaveChanges();
        }



        public void DeleteDevice(int id)
        {
            var device = _context.Devices.Where(d => d.Id.Equals(id)).FirstOrDefault();
            if (device != null)
            {
                _context.Devices.Remove(device);
                _context.SaveChanges();
            }
        }


        public void UpdateDeviceLastSync(int id)
        {
            var entityDevice = _context.Devices.Where(x => x.Id == id).FirstOrDefault();

            if (entityDevice == null)
            {
                throw new ArgumentNullException("Device was not found");
            }

            entityDevice.LastSync = DateTime.UtcNow;

            _context.Update(entityDevice);
            _context.SaveChanges();
        }
    }
}
