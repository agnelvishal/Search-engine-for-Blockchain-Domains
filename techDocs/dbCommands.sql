create table avDomains
(
	id int auto_increment,
	tokenId varchar not null,
	cryptoDomain varchar null,
	ipfsHash varchar null,
	column_5 int null,
	tokenOwnerAddress varchar null,
	ethRedirectAddress varchar null,
	domainTitle varchar null,
	constraint avDomains_pk
		primary key (id)
);

create unique index avDomains_cryptoDomain_uindex
	on avDomains (cryptoDomain);

create unique index avDomains_ipfsHash_uindex
	on avDomains (ipfsHash);

create unique index avDomains_tokenId_uindex
	on avDomains (tokenId);

