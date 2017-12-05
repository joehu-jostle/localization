create table ReleaseName (
    `name` varchar(25) primary key,
    `order` int not null
) engine=INNODB;

create table LineContent (
    id int primary key auto_increment,
    fileOrigin varchar(25) not null,
    lang varchar(10) not null,
    content varchar(2000) not null,
    lineNumber int not null,
    releaseName varchar(25) not null,
    vcRevisionNumber varchar(100) not null,
    contentType varchar(20) not null,
    keyName varchar(200) binary,
    `value` varchar(2000),
    version int not null,
    foreign key (releaseName) references ReleaseName(`name`),
    constraint UC_KeyName Unique (fileOrigin, lang, keyName)
) engine=INNODB;






