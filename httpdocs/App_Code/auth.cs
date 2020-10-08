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
using System.Net.Mail;
using System.Net;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "auth" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class auth : Iauth
{
    public List<SchoolProfile> BindProfile(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT * FROM Schools WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<SchoolProfile> schoolprofile = new List<SchoolProfile>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        schoolprofile.Add(new SchoolProfile
                        {
                            Name = sdr3["Name"].ToString(),
                            Logo = sdr3["Logo"].ToString(),
                            Phone = sdr3["Phone"].ToString(),
                            Email = sdr3["Email"].ToString(),
                            Address = sdr3["Address"].ToString(),
                            Website = sdr3["Website"].ToString(),
                            MerchantId = sdr3["MerchantId"].ToString(),
                        });
                    }
                }
                con.Close();
                return schoolprofile;
            }
        }
    }

    public string DeleteLogo(string SchoolAuth)
    {
        string query = "Update Schools SET Logo = @Logo WHERE SchoolAuth = @SchoolAuth";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Logo", DBNull.Value);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "";
    }

    public string UpdateImage(string Name, string Phone, string Email, string Address, string Logo, string Website, string SchoolAuth, string MerchantId)
    {
        //Logo logo = new JavaScriptSerializer().Deserialize<Logo>(Image);
        string source = Logo;
        string base64 = source.Substring(source.IndexOf(',') + 1);
        string type = source.Split('/', ';')[1];


        Guid guid = Guid.NewGuid();

        //Save the Byte Array as File.
        string filePath = "~/secure/logo/" + guid + "." + type + "";
        File.WriteAllBytes(HttpContext.Current.Server.MapPath(filePath), Convert.FromBase64String(base64));
        string RelativePath = "http://www.communic8a.co.za/secure/logo/" + guid + "." + type + "";

        string query = "Update Schools SET Name = @Name, Phone = @Phone, Email = @Email, Address = @Address, Logo = @Logo, Website = @Website, MerchantId = @MerchantId WHERE SchoolAuth = @SchoolAuth";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Phone", Phone);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.Parameters.AddWithValue("@Address", Address);
                cmd.Parameters.AddWithValue("@Logo", RelativePath);
                cmd.Parameters.AddWithValue("@Website", Website);
                cmd.Parameters.AddWithValue("@MerchantId", MerchantId);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Profile successfully updated";
    }

    public string Update(string Name, string Phone, string Email, string Address, string Website, string SchoolAuth, string MerchantId)
    {
        string query = "Update Schools SET Name = @Name, Phone = @Phone, Email = @Email, Address = @Address, Website = @Website, MerchantId = @MerchantId WHERE SchoolAuth = @SchoolAuth";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Phone", Phone);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.Parameters.AddWithValue("@Address", Address);
                cmd.Parameters.AddWithValue("@Website", Website);
                cmd.Parameters.AddWithValue("@MerchantId", MerchantId);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Profile successfully updated";
    }

    public string Enquiry(string Name, string Email, string Msg)
    {
        MailMessage mm = new MailMessage("info@communic8a.co.za", "info@communic8a.co.za");
        mm.Subject = "Website Enquiry";
        mm.Body = "Name: " + Name + "<br />Email: " + Email + "<br />Message: " + Msg + "";
        mm.IsBodyHtml = true;
        SmtpClient smtp = new SmtpClient();
        smtp.Host = "communic8a.co.za";
        smtp.EnableSsl = false;
        NetworkCredential NetworkCred = new NetworkCredential();
        NetworkCred.UserName = "info@communic8a.co.za";
        NetworkCred.Password = "Password.7";
        smtp.UseDefaultCredentials = true;
        smtp.Credentials = NetworkCred;
        smtp.Port = 25;
        smtp.Send(mm);

        return "Thank you for your enquiry, we will be in contact shortly";
    }

    public List<Summary> BindSummary(string SchoolAuth)
    {
        string Payments = "";
        string Events = "";
        string Galleries = "";
        string Students = "";
        string Notifications = "";

        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        SqlConnection conn = new SqlConnection(constr);
        conn.Open();
        SqlCommand comm = new SqlCommand("SELECT COUNT(*) FROM Accounts WHERE SchoolAuth = @SchoolAuth", conn);
        comm.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
        Int32 count = Convert.ToInt32(comm.ExecuteScalar());
        if (count > 0)
        {
            Students = Convert.ToString(count.ToString());
        }
        else
        {
            Students = "0";
        }
        conn.Close(); //Remember close the connection

        conn.Open();
        SqlCommand comm1 = new SqlCommand("SELECT COUNT(*) FROM Events WHERE SchoolAuth = @SchoolAuth", conn);
        comm1.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
        Int32 count1 = Convert.ToInt32(comm1.ExecuteScalar());
        if (count1 > 0)
        {
            Events = Convert.ToString(count1.ToString());
        }
        else
        {
            Events = "0";
        }
        conn.Close(); //Remember close the connection

        conn.Open();
        SqlCommand comm2 = new SqlCommand("SELECT COUNT(DISTINCT Id) FROM Albums WHERE SchoolAuth = @SchoolAuth", conn);
        comm2.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
        Int32 count2 = Convert.ToInt32(comm2.ExecuteScalar());
        if (count2 > 0)
        {
            Galleries = Convert.ToString(count2.ToString());
        }
        else
        {
            Galleries = "0";
        }
        conn.Close(); //Remember close the connection

        conn.Open();
        SqlCommand comm3 = new SqlCommand("SELECT COUNT(*) FROM Notification_s WHERE SchoolAuth = @SchoolAuth", conn);
        comm3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
        Int32 count3 = Convert.ToInt32(comm3.ExecuteScalar());
        if (count3 > 0)
        {
            Notifications = Convert.ToString(count3.ToString());
        }
        else
        {
            Notifications = "0";
        }
        conn.Close(); //Remember close the connection

        string value = "";
        using (SqlCommand cmd3 = new SqlCommand("SELECT MerchantId FROM Schools WHERE SchoolAuth = @SchoolAuth"))
        {
            cmd3.Connection = conn;
            cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
            conn.Open();
            using (SqlDataReader sdr3 = cmd3.ExecuteReader())
            {
                while (sdr3.Read())
                {
                    value = sdr3["MerchantId"].ToString();
                }
            }
            conn.Close();

            if (value != "")
            {
                Payments = "1";
            }
            else
            {
                Payments = "0";
            }
        }

        List<Summary> summary = new List<Summary>();
        summary.Add(new Summary
        {
            Students = Students,
            Events = Events,
            Galleries = Galleries,
            Payments = Payments,
            Notifications = Notifications,
        });
        return summary;
    }
}


