import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-healthinsurancelist',
  templateUrl: './healthinsurancelist.component.html',
  styleUrls: ['./healthinsurancelist.component.scss']
})
export class HealthinsurancelistComponent implements OnInit {
    lists: any;
    allLists: any;
  constructor() { }

  ngOnInit() {
    this.lists =
        {
            "IsSuccess": true,
            "ResponseObject": [
                {
                    "name": "Group A",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "1003",
                            "premium_amount": "8833.00",
                            "scheme": "2A+2C",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "5",
                            "product_name": "Joy Tomorrow",
                            "premium_id": "1934",
                            "premium_amount": "19727.00",
                            "scheme": "2A+2C",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "7",
                            "product_name": "Family Health Optima",
                            "premium_id": "2125",
                            "premium_amount": "10450.00",
                            "scheme": "2A+2C",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Star Health",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "self",
                            "age": "35"
                        },
                        {
                            "type": "spouse",
                            "age": "29"
                        },
                        {
                            "type": "son1",
                            "age": "6"
                        },
                        {
                            "type": "daughter1",
                            "age": "2"
                        }
                    ]
                },
                {
                    "name": "Group B",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "722",
                            "premium_amount": "17462.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "2",
                            "product_name": "Care Freedom",
                            "premium_id": "1433",
                            "premium_amount": "19109.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "7",
                            "product_name": "Family Health Optima",
                            "premium_id": "2089",
                            "premium_amount": "18595.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Star Health",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "Father",
                            "age": "58"
                        },
                        {
                            "type": "Mother",
                            "age": "50"
                        }
                    ]
                },
                {
                    "name": "Group C",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "722",
                            "premium_amount": "17462.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "2",
                            "product_name": "Care Freedom",
                            "premium_id": "1433",
                            "premium_amount": "19109.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        },
                        {
                            "product_id": "7",
                            "product_name": "Family Health Optima",
                            "premium_id": "2089",
                            "premium_amount": "18595.00",
                            "scheme": "2A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Star Health",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "Father in law",
                            "age": "56"
                        },
                        {
                            "type": "Mother in law",
                            "age": "50"
                        }
                    ]
                },
                {
                    "name": "Group D",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "2",
                            "premium_amount": "3739.00",
                            "scheme": "1A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "Brother1",
                            "age": "32"
                        }
                    ]
                },
                {
                    "name": "Group E",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "2",
                            "premium_amount": "3739.00",
                            "scheme": "1A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "Brother2",
                            "age": "27"
                        }
                    ]
                },
                {
                    "name": "Group F",
                    "product_lists": [
                        {
                            "product_id": "1",
                            "product_name": "Care V2",
                            "premium_id": "1",
                            "premium_amount": "2746.00",
                            "scheme": "1A",
                            "suminsured_amount": "300000.00",
                            "tenure": "1",
                            "company_name": "Religare",
                            "type_name": "Health"
                        }
                    ],
                    "family_members": [
                        {
                            "type": "sister1",
                            "age": "24"
                        }
                    ]
                }
            ]
        }
      this.allLists = this.lists.ResponseObject;
    console.log(this.allLists);

  }

}
