

this is the command to set up some of the DNS and other plumbing 
aws cloudformation create-stack --stack-name CongressCrittersDomainMappingStack --template-body file://domain_mapping.yml
or if it is not the first time 
aws cloudformation update-stack --stack-name CongressCrittersDomainMappingStack --template-body file://domain_mapping.yml