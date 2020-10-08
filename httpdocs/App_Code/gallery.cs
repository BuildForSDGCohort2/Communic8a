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

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "gallery" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class gallery : Igallery
{
    public List<Albums> BindAlbums(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT DISTINCT Id, Name, Date FROM Albums WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<Albums> albums = new List<Albums>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        albums.Add(new Albums
                        {
                            AlbumId = sdr3["Id"].ToString(),
                            Name = sdr3["Name"].ToString(),
                            Date = sdr3["Date"].ToString(),
                        });
                    }
                }
                con.Close();
                return albums;
            }
        }

    }

    public List<Photos> BindPhotos(string Id)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT AlbumId, Url FROM Albums WHERE Id = @Id"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@Id", Id);
                List<Photos> photos = new List<Photos>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        photos.Add(new Photos
                        {
                            AlbumId = sdr3["AlbumId"].ToString(),
                            Url = sdr3["Url"].ToString(),

                        });
                    }
                }
                con.Close();
                return photos;
            }
        }

    }

    public string Delete(string AlbumId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Albums WHERE AlbumId = @AlbumId"))
            {
                cmd.Parameters.AddWithValue("@AlbumId", AlbumId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Photo Deleted";
    }

    public string DeleteAlbum(string Id)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Albums WHERE Id = @Id"))
            {
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Album Deleted";
    }
}
