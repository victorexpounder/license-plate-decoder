import { NextResponse } from 'next/server';
import lgas from '../../../data/lga.json';
import states from '../../../data/states.json';
import stateDetails from '../../../data/stateDetails.json';

export async function GET(req: Request, { params }: { params: { plate: string } }) {
  const { plate } =  params;
  let code: string, 
  plateNum: string,
  batch: number,
  batchNo: string,
  year: number;

  if (!plate) {
    return NextResponse.json({ error: "Plate Numbr Is Required" }, { status: 400 });
  }
  const nospace = plate.replace(/\s/g, "");
  const separated = nospace.split("-");

  if(separated.length !== 2){
    return NextResponse.json({ error: `Invalid Plate Number` }, { status: 400 });
  }else if(separated[0].length > 3){
    plateNum = separated[0];
    code = separated[1];
  }else{
    plateNum = separated[1];
    code = separated[0];
  }
    
  const lga = lgas.find(l => l.code.toUpperCase() === code.toUpperCase());

  if (!lga) {
    return NextResponse.json({ error: `LGA with code '${code}' not found` }, { status: 404 });
  }

  const state = states.find(s => 
    s.lgas.some(lgaName => lgaName.toLowerCase() === lga.lga.toLowerCase())
  );

  if(!state){
    return NextResponse.json({ error: `State with LGA '${lga.lga}' not found` }, { status: 404 });
  }
  const stateDetail = stateDetails.data.find(s => s.info.officialName === state?.state);

  // Extract batch number and letters (3 digits + 2 letters in any order)
  const batchMatch = plateNum.match(/^(\d{3})([A-Z]{2})$|^([A-Z]{2})(\d{3})$/);
  
  if (!batchMatch) {
    return NextResponse.json({ error: "Invalid Plate Number Format" }, { status: 400 });
  }

  batchNo = batchMatch[1] || batchMatch[4];  // Extract 3 digits
  const firstLetter = (batchMatch[2] || batchMatch[3])[0]; // First letter from alphabets
  const secondLetter = (batchMatch[2] || batchMatch[3])[1]; // Second letter from alphabets

  // Calculate year (A = 2011, B = 2012, ..., Z = 2036)
  const baseYear = 2011;
  year = baseYear + (firstLetter.charCodeAt(0) - "A".charCodeAt(0));

  // Calculate batch (A = 1, B = 2, ..., Z = 26)
  batch =  secondLetter.charCodeAt(0) - "A".charCodeAt(0) + 1;


  return NextResponse.json({
    plate: plate.toUpperCase(),
    lga: lga?.lga,
    state: state?.state,
    year,
    age: new Date().getFullYear() - year,
    batch,
    batchNo,
    slogan: stateDetail?.info.Slogan,
    latitude: stateDetail?.info.Latitude,
    longitude: stateDetail?.info.Longitude
  });
}
