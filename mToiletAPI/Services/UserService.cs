using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Entities;
using mToiletAPI.Persistence;

namespace mToiletAPI.Services
{
    public class UserService
    {
        private AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }



        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }



        public User GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                var response = new User();
                response.Id = user.Id;
                response.Username = user.Username;
                response.Password = user.Password;
                response.Gender= user.Gender;
                return response;
            }
            throw new ArgumentNullException(nameof(user));
        }



        public User CreateUser(UserRequest user)
        {
            var entity = new User();
            entity.Username = user.Username;
            entity.Password = user.Password;
            entity.Gender = user.Gender;

            _context.Users.Add(entity);
            _context.SaveChanges();

            return entity;
        }



        public void SaveUserById(int id, User user)
        {
            var entityUser = _context.Users.Where(x => x.Id == id).FirstOrDefault();

            if (user == null)
            {
                throw new ArgumentNullException("User was not found");
            }

            entityUser.Username = user.Username;
            entityUser.Password = user.Password;
            entityUser.Gender = user.Gender;

            _context.Update(entityUser);
            _context.SaveChanges();
        }



        public void DeleteUser(int id)
        {
            var user = _context.Users.Where(d => d.Id.Equals(id)).FirstOrDefault();
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}
