create database vet4pets;

use vet4pets;

create table petOwner(
	id int not null primary key,
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
    name varchar(50) not null,
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

create table appointment(
	id int not null auto_increment primary key,
    dateAppointment datetime not null,
	idPet int not null,
	foreign key (idPet) references pet(id)
);

create table veterinarian(
	id int not null primary key,
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
    idMedicalRecord int not null,
    reason varchar(1000) not null,
    symptoms varchar(500),
    diagnose varchar(1000) not null,
    idTest int not null,
    idMedicine int not null,
    foreign key (idVet) references veterinarian(id),
    foreign key (idMedicalRecord) references medicalRecord(id)
);

