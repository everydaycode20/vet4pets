create database vet4pets;

use vet4pets;

create table petOwner(
	id int not null auto_increment primary key,
    nameOwner varchar(200) not null,
    email varchar(200) not null,
    address varchar(300),
    registerDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

create table telephoneType(
	id int not null auto_increment primary key,
    phoneType varchar(25)
);

create table telOwner(
	id int not null auto_increment primary key,
    idOwner int not null,
    idPhoneType int not null,
    telNumber varchar(15) not null,
    foreign key (idPhoneType) references telephoneType(id)
);

create table breed(
	id int not null auto_increment primary key,
    breedDescription varchar(100)
);

create table petType(
	id int not null auto_increment primary key,
    typeDescription varchar(50) not null,
    idBreed int not null,
    foreign key (idBreed) references breed(id)
);

create table pet(
	id int not null auto_increment primary key,
    idPetOwner int not null,
    namePet varchar(50) not null,
    age int not null,
    idType int,
	registerDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	foreign key (idPetOwner) references petOwner(id),
    foreign key (idType) references petType(id)
);

create table medicalRecord(
	id int not null auto_increment primary key,
    idOwner int not null,
    idPet int not null,
    foreign key (idOwner) references petOwner(id),
    foreign key (idPet) references pet(id)
);

create table appointmentType(
	id int not null auto_increment primary key,
    appointmentName varchar(50) not null
);

create table appointments(
	id int not null auto_increment primary key,
    dateAppointment datetime not null,
	idPet int not null,
    idOwner int not null,
    appointmentType int not null,
	foreign key (idPet) references pet(id),
    foreign key (appointmentType) references appointmentType(id),
    foreign key (idOwner) references petOwner(id)
);

create table veterinarian(
	id int not null primary key auto_increment,
    nameVet varchar(200) not null,
    telVet varchar(15) not null
);

create table vaccineType(
	id int not null auto_increment primary key,
    vaccineName varchar(50) not null,
    comments varchar(50) not null
);

create table vaccine(
	id int not null auto_increment primary key,
    idPet int not null,
    idVet int not null,
    idType int not null,
    dateApplied date not null,
    foreign key (idPet) references pet(id),
    foreign key (idVet) references veterinarian(id),
    foreign key (idType) references vaccineType(id)
);

create table testType(
	id int not null auto_increment primary key,
    nameType varchar(50) not null
);

create table Test(
	id int not null auto_increment primary key,
    idType int not null,
    dateTest date not null,
    foreign key (idType) references testType(id)
);

create table medicineType(
	id int not null auto_increment primary key,
    medicineName varchar(50) not null,
    medicineDescription varchar(255) not null
);

create table medicine(
	id int not null auto_increment primary key,
    idType int not null,
    dose varchar(255) not null,
    foreign key (idType) references medicineType(id)
);

create table checkUp(
	id int not null auto_increment primary key,
    idVet int not null,
    idPet int not null,
    idOwner int not null,
    reason varchar(1000) not null,
    symptoms varchar(500),
    diagnose varchar(1000) not null,
    idTest int not null,
    idMedicine int not null,
    dateCheckup DATETIME DEFAULT CURRENT_TIMESTAMP,
    foreign key (idVet) references veterinarian(id),
    foreign key (idPet) references pet(id),
    foreign key (idOwner) references petOwner(id)
);

DELIMITER $$
create procedure getAppointmentsByDate(in d date)
BEGIN
	select * from appointments where appointments.dateAppointment between timestamp(d, "08:00") and timestamp(d, "17:00") order by appointments.dateAppointment asc;
END $$
DELIMITER;

DELIMITER $$
create procedure getAppointmentsByDay(in d date)
BEGIN
	select appointments.id, time_format(appointments.dateAppointment, '%k:%i') as time, appointmentType.appointmentName, petOwner.nameOwner
	from appointments
	join appointmentType on appointmentType.id = appointments.appointmentType
	join petOwner on petOwner.id = appointments.idOwner
	where date(appointments.dateAppointment) = d order by appointments.dateAppointment asc;
END $$
DELIMITER;

DELIMITER $$
create procedure getAppointmentsByOwner(in id int)
BEGIN
	select petowner.nameowner, pet.namePet, appointment.dateAppointment, appointmenttype.appointmentName
	from petOwner
	join appointment on appointment.idOwner = id
	join pet on pet.id = id
    join appointmenttype on appointmenttype.id = appointment.appointmenttype;
END $$
DELIMITER;

DELIMITER $$
create procedure getNumberAppointmentsByWeek(in date1 date, in date2 date, in date3 date, in date4 date, in date5 date)
BEGIN
	select sum(date(appointments.dateAppointment) = date1) as monday,
	sum(date(appointments.dateAppointment) = date2) as tuesday,
	sum(date(appointments.dateAppointment) = date3) as wednesday,
	sum(date(appointments.dateAppointment) = date4) as thursday,
	sum(date(appointments.dateAppointment) = date5) as friday
	from appointments;
END $$
DELIMITER;

DELIMITER $$
create procedure getCheckupByOwner(in id int)
BEGIN
	select veterinarian.nameVet, pet.namePet, petowner.nameOwner, checkup.reason, checkup.diagnose, medicineType.medicineDescription as medicineDesc, medicine.dose as medicineDose, 
	checkup.dateCheckup, testType.nametype as testName, test.datetest as testDate
	from checkup
	join veterinarian on veterinarian.id = checkup.idVet
	join pet on pet.id = checkup.idPet
	join petowner on petowner.id = checkup.idOwner
	join medicine on medicine.id = checkup.idmedicine
	join medicinetype on medicine.idtype = medicinetype.id
	join test on test.id = checkup.idtest
	join testtype on test.idtype = testtype.id
	where checkup.idOwner = id order by checkup.dateCheckup desc limit 5;
END $$
DELIMITER;

DELIMITER $$
create procedure getAppointmentsByWeek(in d date, in d2 date)
BEGIN
	select appointments.id, date_format(appointments.dateAppointment, '%Y-%m-%d %k:%i') as fullDate, dayname(appointments.dateAppointment) as day, dayofmonth(appointments.dateAppointment) as dateDay,
	date(appointments.dateAppointment) as date, date_format(appointments.dateAppointment, '%Y-%m-%d %k:%i') as fullDate, time_format(appointments.dateAppointment, '%k:%i') as time,
	appointmentType.appointmentName, petowner.nameOwner, pet.namePet
	from appointments
	join appointmenttype on appointmentType.id = appointments.appointmentType
	join petowner on petowner.id = appointments.idOwner
	join pet on pet.id = appointments.idPet
	where appointments.dateAppointment between timestamp(d, "08:00") and timestamp(d2, "17:00") order by appointments.dateAppointment asc ;
END $$
DELIMITER;

DELIMITER $$
create procedure getAppointmentsByMonth(in y year)
BEGIN
	select monthname(appointments.dateappointment) as month, count(*) as appointments
	from appointments
	where year(appointments.dateappointment) = y group by month(appointments.dateappointment) order by appointments.dateappointment asc;
END $$
DELIMITER;

DELIMITER $$
create procedure getAppointmentsByYear()
BEGIN
	select year(appointments.dateappointment) as year, count(*) as appointments
	from appointments
	group by year(appointments.dateappointment) order by  appointments.dateappointment desc;
END $$
DELIMITER;

DELIMITER $$
create procedure getOwners()
BEGIN
	select  petowner.id, nameOwner, email, address, group_concat(telowner.telnumber separator ",") as telephones, date_format(petowner.registerDate, '%Y-%m-%d') as registerDate
	from petowner
	join telowner on telowner.idOwner = petOwner.id group by petowner.nameOwner order by petowner.nameowner asc;
END $$
DELIMITER;

DELIMITER $$
create procedure getPets()
BEGIN
	select pet.id, pet.namePet, pet.age, petOwner.nameOwner, petType.typeDescription, date_format(pet.registerDate, '%Y-%m-%d') as registerDate
	from pet
	join petOwner on petOwner.id = pet.idPetOwner
	join petType on petType.id = pet.idType;
END $$
DELIMITER;

DELIMITER $$
create procedure getTotalAppointmentsByOwner(in id int, in d date)
BEGIN
	select sum(date(appointments.dateAppointment) < d ) as past, sum(date(appointments.dateAppointment) > d ) as upcoming
	from petOwner
	join appointments on appointments.idOwner = petOwner.id
	where petowner.id = id;
END $$
DELIMITER;

DELIMITER $$
create procedure getPastAppointmentsByOwner(in id int)
BEGIN
	select appointments.id, dayofmonth(appointments.dateAppointment) as day, month(appointments.dateAppointment) as month, year(appointments.dateAppointment) as year,
	time_format(appointments.dateAppointment, '%k:%i') as time, pet.namePet, petowner.nameOwner, appointmentType.appointmentName
	from appointments
	join pet on pet.id = appointments.idPet
	join petowner on petowner.id = appointments.idOwner
	join appointmenttype on appointmentType.id = appointments.appointmentType
	where appointments.idOwner = id and appointments.dateAppointment <= curdate() order by appointments.dateAppointment desc;
END $$
DELIMITER;

DELIMITER $$
create procedure getUpcomingAppointmentsByOwner(in id int)
BEGIN
	select appointments.id, dayofmonth(appointments.dateAppointment) as day, month(appointments.dateAppointment) as month, year(appointments.dateAppointment) as year,
	time_format(appointments.dateAppointment, '%k:%i') as time, pet.namePet, petowner.nameOwner, appointmentType.appointmentName
	from appointments
	join pet on pet.id = appointments.idPet
	join petowner on petowner.id = appointments.idOwner
	join appointmenttype on appointmentType.id = appointments.appointmentType
	where appointments.idOwner = id and appointments.dateAppointment > curdate() order by appointments.dateAppointment asc;
END $$
DELIMITER;

DELIMITER $$
create procedure getPetType()
BEGIN
	select petType.id as idType, typeDescription, breed.id as idBreed, breedDescription
	from petType
	join breed on breed.id = petType.idBreed;
END $$
DELIMITER;

DELIMITER $$
create procedure getNumberPatients()
BEGIN
	select  sum(case when  year(registerDate) = year(curdate()) then 1 else 0 end) as countYear,
	sum(case when month(registerDate) = month(curdate()) then 1 else 0 end) as countMonth
	from pet;
END $$
DELIMITER;

DELIMITER $$
create procedure getNumberAppointmentsByDay()
BEGIN
	select  sum(case when dateAppointment between concat(curdate(), " ", "8:00") and concat(curdate(), " ", curtime()) then 1 else 0 end) as finished,
	sum(case when dateAppointment between concat(curdate(), " ", curtime()) and concat(curdate(), " ", "17:00") then 1 else 0 end) as upcoming
	from appointments;
END $$
DELIMITER;

DELIMITER $$
create procedure getTopAppointments()
BEGIN
	select appointmentType.appointmentName, count(*) as count
	from appointments
	join appointmentType on appointmentType.id = appointments.appointmentType
	group by appointmentType order by count desc limit 5;
END $$
DELIMITER;



