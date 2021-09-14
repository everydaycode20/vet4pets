create database prueba;
use prueba;
create table a(
	id int not null auto_increment primary key,
    fecha datetime not null
);

SELECT @@global.time_zone;
SET time_zone = 'cst';
SELECT NOW();
SELECT TIMEDIFF(NOW(), UTC_TIMESTAMP);
SET GLOBAL time_zone = '-06:00';

select * from a;

insert into a(fecha) values("2021-08-27 08:00:00");
insert into a(fecha) values("2021-09-10 16:30:00");

select * from a where a.fecha between "2021-08-27 08:00:00" and "2021-08-27 17:00" order by a.fecha asc;

select * from a where a.fecha between timestamp("2021-08-27", "08:00") and timestamp("2021-08-27", "17:00") order by a.fecha asc;
select * from a where a.fecha = "2021-08-27 08:00";

DELIMITER $$
create procedure getDa(in d date)
BEGIN
	select * from a where a.fecha between timestamp(d, "08:00") and timestamp(d, "17:00") order by a.fecha asc;
END $$
DELIMITER;

call getDa("2021-08-29");

DELIMITER $$
create function hrs(h datetime)
returns boolean
deterministic
begin
	declare isExist bool;
	set isExist = 0;
	select exists ( select * from a where a.fecha = h) into isExist;
    return isExist;
end $$
DELIMITER;

select hrs("2021-08-27 08:00:00");

DELIMITER $$
create procedure getDatt(h date)
BEGIN
	declare isExist bool;
	set isExist = 0;
	select exists ( select * from a where a.fecha = h) ;
END $$
DELIMITER;

call getDatt("2021-08-27 08:00:00");

select * from a where a.fecha in (select max(a.fecha) from a );

-- select * from a where addtime((select * from a where a.fecha in (select max(a.fecha) from a )) + "00:30:00") > "2021-08-27 09:30:00";

select * from a where "2021-08-27 10:31:00" <= a.fecha + interval 30 minute;

insert into a(fecha) values("2021-08-28 13:045:00");

DELIMITER $$
create trigger tr_table
before insert on a
for each row
begin
	if exists (select * from a where new.fecha < (select * from a.fecha) then signal sqlstate "45000" set message_text = "new appointment overlaps with current ones";
	end if;    
end;
$$ DELIMITER ;

show triggers;

drop trigger prueba.tr_table;

-- a.fecha + interval 30 minute