create table ReleaseName (
	`name` varchar(25) primary key,
    `order` int not null
) engine=INNODB;

create table LineContent (
	id int primary key auto_increment,
    fileOrigin varchar(25) not null,
    content varchar(2000) not null,
    lineNumber int not null,
    releaseName varchar(25) not null,
    vcRevisionNumber varchar(100) not null,
    contentType varchar(10) not null,
    foreign key (releaseName) references ReleaseName(`name`)
) engine=INNODB;

create table LocalizedString (
	id int primary key,
    keyName varchar(100) not null,
    `value` varchar(2000) not null,
    version int not null,
    foreign key (id) references LineContent(id) on delete cascade,
    constraint UC_KeyName Unique (keyName)
) engine=INNODB;




