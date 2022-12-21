using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Dtos.Responses;
using mToiletAPI.Models.Entities;
using mToiletAPI.Persistence;

namespace mToiletAPI.Services
{
    public class QRCodeService
    {
        private AppDbContext _context;

        public QRCodeService(AppDbContext context)
        {
            _context = context;
        }

        public List<QRCode> GetAllCodes()
        {
            return _context.QRCodes.ToList();
        }

        public QRCode GetCodeById(int id)
        {
            var code = _context.QRCodes.FirstOrDefault(x => x.Id == id);
            if (code != null)
            {
                var response = new QRCode();
                response.Id = code.Id;
                response.Price = code.Price;

                return response;
            }
            throw new ArgumentNullException(nameof(code));
        }

        public QRCode CreateCode(QRCodeCreateRequest code)
        {
            var entity = new QRCode();
            entity.Price = code.Price;

            _context.QRCodes.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public void SaveCodeById(int id, QRCodeCreateRequest code)
        {
            var entity = _context.QRCodes.Where(x => x.Id == id).FirstOrDefault();

            if (code == null)
            {
                throw new ArgumentNullException("QRCode was not found");
            }

            entity.Price = code.Price;

            _context.Update(entity);
            _context.SaveChanges();
        }

        public void DeleteCode(int id)
        {
            var code = _context.QRCodes.Where(d => d.Id.Equals(id)).FirstOrDefault();
            if (code != null)
            {
                _context.QRCodes.Remove(code);
                _context.SaveChanges();
            }
        }
    }
}
