import { faker } from "@faker-js/faker";
import  dayjs  from "dayjs";
import  Cryptr  from "cryptr";

import * as cardRepository from '../repositories/cardRepository';
import * as employeeRepository from '../repositories/employeeRepository';


function abbreviateName(name:string) :string{

  const arrName = name.split(' ');

  let middleName: string = '';

  if(arrName.length >= 3){
    for(let i = 1; i < arrName.length-1; i++ ){

      if(arrName[i].length >= 3){
        middleName += arrName[i][0];
      }
  
    }
  }
  
  let abbName = arrName[0] + ' ' + middleName + ' ' + arrName[arrName.length-1];
  return abbName.toUpperCase();
}

function genCardNumber(): string{
  return faker.finance.creditCardNumber();
}
function genCardExpiration(): string{
  return dayjs().add(5, 'year').format('MM/YY');
}

export async function newCard(employeeId: number, type: cardRepository.TransactionTypes) {
  
  const employee = await employeeRepository.findById(employeeId);

  const cvc = faker.finance.creditCardCVV();

  const cryptr = new Cryptr("key"+process.env.SECRET_CRYPTR);

  const cardData : cardRepository.CardInsertData = {
    employeeId: employeeId,
    number: genCardNumber(),
    cardholderName: abbreviateName( employee.fullName ),
    securityCode: cryptr.encrypt(cvc),
    expirationDate: genCardExpiration(),
    password: undefined,
    isVirtual: false,
    originalCardId: undefined,
    isBlocked: false,
    type: type
  };
  
  await cardRepository.insert(cardData);

  return abbreviateName( employee.fullName );
}