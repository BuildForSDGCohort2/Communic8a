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

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "accounts" in code, svc and config file together.
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class accounts : Iaccounts
{
    public List<Students> BindStudents(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT AccountId, Name, Surname, Class FROM Accounts WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<Students> students = new List<Students>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        students.Add(new Students
                        {
                            AccountId = sdr3["AccountId"].ToString(),
                            Name = sdr3["Name"].ToString(),
                            Surname = sdr3["Surname"].ToString(),
                            Class = sdr3["Class"].ToString(),
                        });
                    }
                }
                con.Close();
                return students;
            }
        }
    }

    public List<School> BindSchool(string SchoolAuth)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT Name, Logo FROM Schools WHERE SchoolAuth = @SchoolAuth"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                List<School> school = new List<School>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        school.Add(new School
                        {
                            Name = sdr3["Name"].ToString(),
                            Logo = sdr3["Logo"].ToString(),
                        });
                    }
                }
                con.Close();
                return school;
            }
        }
    }

    public string Create(string Name, string Surname, string IDNumber, string Dob, string Address, string Fees, string PaymentDate, string Parent1, string ParentEmail1, string ParentNumber1, string Parent2, string ParentEmail2, string ParentNumber2, string Class, string StudentNumber, string SchoolAuth)
    {
        string query = "INSERT INTO Accounts VALUES(@Name, @Surname, @Address, @Email1, @Email2, @IDNumber, @Dob,  @AuthId, @TokenId, @Phone1, @Phone2, @SchoolFees, @SchoolAuth, @MothersName, @FathersName,  @PaymentDate, @StudentNumber, @Class)";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Surname", Surname);
                cmd.Parameters.AddWithValue("@Address", Address);
                cmd.Parameters.AddWithValue("@Email1", ParentEmail1);
                cmd.Parameters.AddWithValue("@Email2", ParentEmail2);
                cmd.Parameters.AddWithValue("@IDNumber", IDNumber);
                cmd.Parameters.AddWithValue("@Dob", Dob);
                cmd.Parameters.AddWithValue("@AuthId", DBNull.Value);
                cmd.Parameters.AddWithValue("@TokenId", DBNull.Value);
                cmd.Parameters.AddWithValue("@Phone1", ParentNumber1);
                cmd.Parameters.AddWithValue("@Phone2", ParentNumber2);
                cmd.Parameters.AddWithValue("@SchoolFees", Fees);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Parameters.AddWithValue("@MothersName", Parent1);
                cmd.Parameters.AddWithValue("@FathersName", Parent2);
                cmd.Parameters.AddWithValue("@PaymentDate", PaymentDate);
                cmd.Parameters.AddWithValue("@StudentNumber", StudentNumber);
                cmd.Parameters.AddWithValue("@Class", Class);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Student Account has been created ";
    }

    public List<Student> Edit(string AccountId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT * FROM Accounts WHERE AccountId = @AccountId"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@AccountId", AccountId);
                List<Student> student = new List<Student>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        student.Add(new Student
                        {
                            Name = sdr3["Name"].ToString(),
                            Surname = sdr3["Surname"].ToString(),
                            Address = sdr3["Address"].ToString(),
                            Email1 = sdr3["Email1"].ToString(),
                            Email2 = sdr3["Email2"].ToString(),
                            IDNumber = sdr3["IDNumber"].ToString(),
                            Dob = sdr3["Dob"].ToString(),
                            Phone1 = sdr3["Phone1"].ToString(),
                            Phone2 = sdr3["Phone2"].ToString(),
                            SchoolFees = sdr3["SchoolFees"].ToString(),
                            MothersName = sdr3["MothersName"].ToString(),
                            FathersName = sdr3["FathersName"].ToString(),
                            PaymentDate = sdr3["PaymentDate"].ToString(),
                            StudentNumber = sdr3["StudentNumber"].ToString(),
                            Class = sdr3["Class"].ToString(),
                        });
                    }
                }
                con.Close();
                return student;
            }
        }
    }

    public string Update(string Name, string Surname, string IDNumber, string Dob, string Address, string Fees, string PaymentDate, string Parent1, string ParentEmail1, string ParentNumber1, string Parent2, string ParentEmail2, string ParentNumber2, string Class, string StudentNumber, string AccountId)
    {
        string query = "UPDATE Accounts SET Name=@Name, Surname=@Surname, Address=@Address, Email1=@Email1, Email2=@Email2, IDNumber=@IDNumber, Dob=@Dob, Phone1=@Phone1, Phone2=@Phone2, SchoolFees=@SchoolFees, MothersName=@MothersName, FathersName=@FathersName,  PaymentDate=@PaymentDate, StudentNumber=@StudentNumber, Class=@Class WHERE AccountId=@AccountId";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Surname", Surname);
                cmd.Parameters.AddWithValue("@Address", Address);
                cmd.Parameters.AddWithValue("@Email1", ParentEmail1);
                cmd.Parameters.AddWithValue("@Email2", ParentEmail2);
                cmd.Parameters.AddWithValue("@IDNumber", IDNumber);
                cmd.Parameters.AddWithValue("@Dob", Dob);
                cmd.Parameters.AddWithValue("@Phone1", ParentNumber1);
                cmd.Parameters.AddWithValue("@Phone2", ParentNumber2);
                cmd.Parameters.AddWithValue("@SchoolFees", Fees);
                cmd.Parameters.AddWithValue("@MothersName", Parent1);
                cmd.Parameters.AddWithValue("@FathersName", Parent2);
                cmd.Parameters.AddWithValue("@PaymentDate", PaymentDate);
                cmd.Parameters.AddWithValue("@StudentNumber", StudentNumber);
                cmd.Parameters.AddWithValue("@Class", Class);
                cmd.Parameters.AddWithValue("@AccountId", AccountId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Student Account has been updated";
    }

    public string Delete(string AccountId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Accounts WHERE AccountId = @AccountId"))
            {
                cmd.Parameters.AddWithValue("@AccountId", AccountId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Account Deleted";
    }

    public List<ExtraM> BindEm(string AccountId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT EmId, Name FROM Emdb WHERE AccountId = @AccountId"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@AccountId", AccountId);
                List<ExtraM> extram = new List<ExtraM>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        extram.Add(new ExtraM
                        {
                            EmId = sdr3["EmId"].ToString(),
                            Name = sdr3["Name"].ToString(),
                        });
                    }
                }
                con.Close();
                return extram;
            }
        }
    }

    public List<Extra> EditEm(string EmId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT Name, Amount, PaymentDate FROM Emdb WHERE EmId = @EmId"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@EmId", EmId);
                List<Extra> extra = new List<Extra>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        extra.Add(new Extra
                        {
                            Name = sdr3["Name"].ToString(),
                            Amount = sdr3["Amount"].ToString(),
                            PaymentDate = sdr3["PaymentDate"].ToString(),
                        });
                    }
                }
                con.Close();
                return extra;
            }
        }
    }

    public string UpdateEm(string Name, string Amount, string PaymentDate, string EmId)
    {
        string query = "UPDATE Emdb SET Name=@Name, Amount=@Amount, PaymentDate=@PaymentDate WHERE EmId=@EmId";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Amount", Amount);
                cmd.Parameters.AddWithValue("@PaymentDate", PaymentDate);
                cmd.Parameters.AddWithValue("@EmId", EmId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Student's extra mural activity has been updated";
    }

    public string DeleteEm(string EmId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Emdb WHERE EmId = @EmId"))
            {
                cmd.Parameters.AddWithValue("@EmId", EmId);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Extra mural activity Deleted";
    }

    public string CreateEm(string Name, string Amount, string AccountId, string PaymentDate, string SchoolAuth)
    {
        string query = "INSERT INTO Emdb VALUES(@Name, @Amount, @AccountId, @PaymentDate, @SchoolAuth)";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Amount", Amount);
                cmd.Parameters.AddWithValue("@AccountId", AccountId);
                cmd.Parameters.AddWithValue("@PaymentDate", PaymentDate);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Extra Mural activity has been added to student account";
    }

    public string CreateTransact(string Description, string Allocation, string Amount, string AccountId, string SchoolAuth, string Date)
    {
        
        string query = "INSERT INTO Statement VALUES(@Description, @Debit, @Credit, @AccountId, @SchoolAuth, @Date)";
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                cmd.Parameters.AddWithValue("@Description", Description);
                if (Allocation == "Debit")
                {
                    cmd.Parameters.AddWithValue("@Debit", Amount);
                    cmd.Parameters.AddWithValue("@Credit", "0");
                }
                else
                {
                    cmd.Parameters.AddWithValue("@Debit", "0");
                    cmd.Parameters.AddWithValue("@Credit", Amount);
                }
                cmd.Parameters.AddWithValue("@AccountId", AccountId);
                cmd.Parameters.AddWithValue("@SchoolAuth", SchoolAuth);
                cmd.Parameters.AddWithValue("@Date", Date);
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
        return "Transaction Recorded";
    }

    public List<Statement> BindStatement(string AccountId)
    {
        string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd3 = new SqlCommand("SELECT * FROM Statement WHERE AccountId = @AccountId"))
            {
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@AccountId", AccountId);
                List<Statement> statement = new List<Statement>();
                con.Open();
                using (SqlDataReader sdr3 = cmd3.ExecuteReader())
                {
                    while (sdr3.Read())
                    {
                        statement.Add(new Statement
                        {
                            StatementId = sdr3["StatementId"].ToString(),
                            Date = sdr3["Date"].ToString(),
                            Description = sdr3["Description"].ToString(),
                            Debit = sdr3["Debit"].ToString(),
                            Credit = sdr3["Credit"].ToString(),
                        });
                    }
                }
                con.Close();
                return statement;
            }
        }
    }
}
