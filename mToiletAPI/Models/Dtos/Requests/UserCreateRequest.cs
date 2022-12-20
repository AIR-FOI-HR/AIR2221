namespace mToiletAPI.Models.Dtos.Requests
{
    public class UserCreateRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
    }
}
