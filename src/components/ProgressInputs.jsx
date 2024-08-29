
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"


export default function ProgressInputs() {
  return (
    <Card className='w-1/2'>
      <CardHeader>Enter your daily Health Metrics</CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="BW">Body Weight(in kgs)</Label>
          <Input id="BW" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="HR">Heart Rate</Label>
          <Input id="HR" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="ECG">ECG</Label>
          <Input id="ECG" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="BSL">Blood Sugar Level</Label>
          <Input id="BSL" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="BP">Blood Pressure</Label>
          <Input id="BP" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="BW">Body Weight(in kgs)</Label>
          <Input id="BW" type="number">
          </Input>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
