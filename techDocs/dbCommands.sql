-- auto-generated definition
create table avDomains
(
    id                 int auto_increment
        primary key,
    tokenId            varchar(128)  not null,
    cryptoDomain       varchar(64)   null,
    ipfsHash           varchar(64)   null,
    tokenOwnerAddress  varchar(64)   null,
    ethRedirectAddress varchar(64)   null,
    domainTitle        varchar(2024) null,
    domainType         varchar(8)    null,
    defaultPopularity  int           null,
    imgLink            varchar(1024) null,
    imgCount           int           null,
    charCount          int           null,
    constraint avDomains_cryptoDomain_uindex
        unique (cryptoDomain),
    constraint avDomains_ipfsHash_uindex
        unique (ipfsHash),
    constraint avDomains_tokenId_uindex
        unique (tokenId)
);

