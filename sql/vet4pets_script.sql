create database vet4pets;

use vet4pets;

create table petOwner(
	id int not null auto_increment primary key,
    nameOwner varchar(200) not null,
    email varchar(200) not null,
    address varchar(300)
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
	select * from appointment where appointment.dateAppointment between timestamp(d, "08:00") and timestamp(d, "17:00") order by appointment.dateAppointment asc;
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
	select sum(date(appointment.dateAppointment) = date1) as monday,
	sum(date(appointment.dateAppointment) = date2) as tuesday,
	sum(date(appointment.dateAppointment) = date3) as wednesday,
	sum(date(appointment.dateAppointment) = date4) as thursday,
	sum(date(appointment.dateAppointment) = date5) as friday
	from appointment;
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



