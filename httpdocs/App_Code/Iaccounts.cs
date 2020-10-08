using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "Iaccounts" in both code and config file together.
[ServiceContract]
public interface Iaccounts
{
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Students> BindStudents(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<School> BindSchool(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Create(string Name, string Surname, string IDNumber, string Dob, string Address, string Fees, string PaymentDate, string Parent1, string ParentEmail1, string ParentNumber1, string Parent2, string ParentEmail2, string ParentNumber2, string Class, string StudentNumber, string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Student> Edit(string AccountId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Update(string Name, string Surname, string IDNumber, string Dob, string Address, string Fees, string PaymentDate, string Parent1, string ParentEmail1, string ParentNumber1, string Parent2, string ParentEmail2, string ParentNumber2, string Class, string StudentNumber, string AccountId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Delete(string AccountId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<ExtraM> BindEm(string AccountId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Extra> EditEm(string EmId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string UpdateEm(string Name, string Amount, string PaymentDate, string EmId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string DeleteEm(string EmId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string CreateEm(string Name, string Amount, string AccountId, string Paymentate, string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string CreateTransact(string Description, string Allocation, string Amount, string AccountId, string SchoolAuth, string Date);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Statement> BindStatement(string AccountId);
}

public class Students
{
    public string AccountId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Class { get; set; }
}

public class School
{
    public string Name { get; set; }
    public string Logo { get; set; }
}

public class Student
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address{ get; set; }
    public string Email1 { get; set; }
    public string Email2 { get; set; }
    public string IDNumber { get; set; }
    public string Dob { get; set; }
    public string Phone1 { get; set; }
    public string Phone2{ get; set; }
    public string SchoolFees { get; set; }
    public string MothersName { get; set; }
    public string FathersName { get; set; }
    public string PaymentDate { get; set; }
    public string StudentNumber { get; set; }
    public string Class { get; set; }
}

public class ExtraM
{
    public string EmId { get; set; }
    public string Name { get; set; }
}

public class Extra
{
    public string Name { get; set; }
    public string Amount { get; set; }
    public string PaymentDate { get; set; }
}

public class Statement
{
    public string StatementId { get; set; }
    public string Date { get; set; }
    public string Description { get; set; }
    public string Debit { get; set; }
    public string Credit { get; set; }
    
}
