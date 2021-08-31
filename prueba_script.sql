create database prueba;
use prueba;
create table a(
	id int not null auto_increment primary key,
    fecha datetime not null
);

select * from a;

insert into a(fecha) values("2021-08-27 09:00:00");
insert into a(fecha) values("2021-08-27 10:00:00");

select * from a where a.fecha < "2021-08-27 09:30:00";

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