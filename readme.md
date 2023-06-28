
this is the command to start the local web server
cd congress-critters-web-ui
npm run dev


to deploy the back end
npx sls deploy --stage dev
npx sls deploy --stage prod

this is the command to set up some of the DNS and other plumbing 
aws cloudformation create-stack --stack-name CongressCrittersDomainMappingStack --template-body file://domain_mapping.yml --disable-rollback
or if it is not the first time 
aws cloudformation update-stack --stack-name CongressCrittersDomainMappingStack --template-body file://domain_mapping.yml --disable-rollback