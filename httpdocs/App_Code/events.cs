using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using System.ServiceModel.Activation;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "accounts" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class events : Ievents
{
    public List<EventDates> BindEvents(string Date, string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT EventId, title, Description, Venue, Poster FROM Events WHERE SchoolAuth = @SchoolAuth  AND date = @date"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd3.Parameters.AddWithValue("@date", Date);
                List<EventDates> eventdates = new List<EventDates>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        eventdates.Add(new EventDates
                        {
                            EventId = sdr3["EventId"].ToString(),
                            Title = sdr3["title"].ToString(),
                            Description = sdr3["Description"].ToString(),
                            Venue = sdr3["Venue"].ToString(),
                            Poster = sdr3["Poster"].ToString(),
                        });
                    }
                }
                con.Close();
                return eventdates;
               
            }
        }
    }

    public List<Events> BindDates(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT DISTINCT * FROM Events WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<Events> events = new List<Events>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        events.Add(new Events
                        {
                            title = sdr3["title"].ToString(),
                            date = sdr3["date"].ToString(),
                            badge = "true",
                        });
                    }
                }
                con.Close();
                return events;

            }
        }
                
    }

    public string Delete(string EventId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Events WHERE EventId = @EventId"))
            {
                cmd.Parameters.AddWithValue("@EventId", EventId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Event Deleted";
    }

    public string Update(string Title, string Description, string Date, string Venue, string EventId)
    {
        string query = "Update Events SET title = @title, Description = @Description, date = @date, Venue = @Venue WHERE EventId = @EventId";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@title", Title);
                cmd.Parameters.AddWithValue("@Description", Description);
                cmd.Parameters.AddWithValue("@date", Date);
                cmd.Parameters.AddWithValue("@Venue", Venue);
                cmd.Parameters.AddWithValue("@EventId", EventId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Event successfully updated";
    }

    public string UpdateImage(string Title, string Description, string Date, string Venue, string Poster, string EventId)
    {
        //Logo logo = new JavaScriptSerializer().Deserialize<Logo>(Image);
        string source = Poster;
        string base64 = source.Substring(source.IndexOf(',') + 1);
        string type = source.Split('/', ';')[1];


        Guid guid = Guid.NewGuid();

        //Save the Byte Array as File.
        string filePath = "~/secure/images/" + guid + "." + type + "";
        File.WriteAllBytes(HttpContext.Current.Server.MapPath(filePath), Convert.FromBase64String(base64));
        string RelativePath = "http://www.communic8a.co.za/secure/images/" + guid + "." + type + "";

        string query = "Update Events SET title = @title, Description = @Description, date = @date, Venue = @Venue, Poster = @Poster WHERE EventId = @EventId";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@title", Title);
                cmd.Parameters.AddWithValue("@Description", Description);
                cmd.Parameters.AddWithValue("@date", Date);
                cmd.Parameters.AddWithValue("@Venue", Venue);
                cmd.Parameters.AddWithValue("@Poster", RelativePath);
                cmd.Parameters.AddWithValue("@EventId", EventId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Event successfully updated";
    }

    public string Create(string Title, string Description, string Date, string Venue, string SchoolAuth)
    {
        string query = "INSERT INTO Events VALUES(@title, @Description, @date, @Venue, @Poster, @SchoolAuth)";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@title", Title);
                cmd.Parameters.AddWithValue("@Description", Description);
                cmd.Parameters.AddWithValue("@date", Date);
                cmd.Parameters.AddWithValue("@Venue", Venue);
                cmd.Parameters.AddWithValue("@Poster", DBNull.Value);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Event successfully created";
    }

    public string CreateImage(string Title, string Description, string Date, string Venue, string Poster, string SchoolAuth)
    {
        //Logo logo = new JavaScriptSerializer().Deserialize<Logo>(Image);
        string source = Poster;
        string base64 = source.Substring(source.IndexOf(',') + 1);
        string type = source.Split('/', ';')[1];


        Guid guid = Guid.NewGuid();

        //Save the Byte Array as File.
        string filePath = "~/secure/images/" + guid + "." + type + "";
        File.WriteAllBytes(HttpContext.Current.Server.MapPath(filePath), Convert.FromBase64String(base64));
        string RelativePath = "http://www.communic8a.co.za/secure/images/" + guid + "." + type + "";

        string query = "INSERT INTO Events VALUES(@title, @Description, @date, @Venue, @Poster, @SchoolAuth)";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@title", Title);
                cmd.Parameters.AddWithValue("@Description", Description);
                cmd.Parameters.AddWithValue("@date", Date);
                cmd.Parameters.AddWithValue("@Venue", Venue);
                cmd.Parameters.AddWithValue("@Poster", RelativePath);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Event successfully created";
    }

    public List<EventData> Edit(string EventId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT * FROM Events WHERE EventId = @EventId"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@EventId", EventId);
                List<EventData> eventdata = new List<EventData>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        eventdata.Add(new EventData
                        {
                            Title = sdr3["title"].ToString(),
                            Description = sdr3["Description"].ToString(),
                            Date = sdr3["date"].ToString(),
                            Venue = sdr3["Venue"].ToString(),
                            Poster = sdr3["Poster"].ToString(),
                        });
                    }
                }
                con.Close();
                return eventdata;

            }
        }

    }

}
