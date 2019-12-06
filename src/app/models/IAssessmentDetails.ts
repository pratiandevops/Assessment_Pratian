import { TestValue } from './ITestValue';

export interface IAssessmentDetails{
     CodeAssesmentID: number;
     AssesmentName: string;
     Description: string;
     TestValues: TestValue[];
     TimeInSeconds: string;
     DateOfAssesment: Date;
}