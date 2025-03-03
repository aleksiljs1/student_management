import { AllUniversityService } from "@/app/api/services/student.service";
import { NextResponse } from "next/server";


export async function GET(){
  const sendAllData = new AllUniversityService()
try {
  const AllData = await sendAllData.getAllUniversity()
  return NextResponse.json(AllData)
} catch (error){
    return NextResponse.json(
      { message: "error related to the Faculty table sening all data", error: error },
      {status:400},
    )
//turn to status 401 when i will add the token requirement here
}





}