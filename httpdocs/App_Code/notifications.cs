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
using System.Net;
using System.IO;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "notifications" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class notifications : Inotifications
{
    public List<Notifications> BindNotifications(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT * FROM Notification_s WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<Notifications> notifications = new List<Notifications>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        notifications.Add(new Notifications
                        {
                            NotificationId = sdr3["NotificationId"].ToString(),
                            Title = sdr3["Title"].ToString(),
                            Message = sdr3["Message"].ToString(),
                            Date = sdr3["Date"].ToString(),
                        });
                    }
                }
                con.Close();
                return notifications;
            }
        }
    }

    public string SendNotification(string Title, string Message, string SchoolAuth)
    {
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            string query = "INSERT INTO Notification_s VALUES(@Title, @Message, @SchoolAuth, @Date)";
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Parameters.AddWithValue("@Title", Title);
                    cmd.Parameters.AddWithValue("@Message", Message);
                    cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                    cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("dd-MM-yyy"));
                    cmd.Connection = con;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return "Your Notification Was Sent Successfully!";
        

    }

    public string fcm(string Title, string Message, string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        SqlConnection con = new SqlConnection(constr);
        Tokens[] allRecords = null;
        string sql = @"SELECT TokenId FROM  Accounts WHERE SchoolAuth = @SchoolAuth";
        using (var command = new SqlCommand(sql, con))
        {
            command.Parameters.AddWithValue("@SchoolAth", SchoolAuth);
            con.Open();
            using (var reader = command.ExecuteReader())
            {
                var list = new List<Tokens>();
                while (reader.Read())
                    list.Add(new Tokens { TokenId = reader.GetString(0) });
                allRecords = list.ToArray();
            }
        }

        string serverKey = "myServerKey";

        try
        {
            var result = "-1";
            var webAddr = "https://fcm.googleapis.com/fcm/send";

            //var regID = "\"" + regID + "\", \"" + regID + "\" \"" + regID + "";

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("Authorization:key=" + serverKey);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {

                string json = "{\"registration_ids\": [" + allRecords + "],\"notification\": {\"title\": \"" + Title + "\",\"body\": \"" + Message + "\"},\"priority\":10}";
                //registration_ids, array of strings -  to, single recipient
                streamWriter.Write(json);
                streamWriter.Flush();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }

            string query = "INSERT INTO Notification_s VALUES(@Title, @Message, @SchoolAuth, @Date)";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Parameters.AddWithValue("@Title", Title);
                    cmd.Parameters.AddWithValue("@Message", Message);
                    cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                    cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("dd-MM-yyy"));
                    cmd.Connection = con;
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }

            return "Your Notification Was Sent Successfully!";
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return "err";
        }
    }
}
