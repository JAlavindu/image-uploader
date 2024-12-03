import { Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ImageUploader() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>
          Drag and drop your image here or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 cursor-pointer">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              PNG, JPG or GIF up to 10MB
            </p>
            <p className="text-xs text-muted-foreground">
              Drop your image here or click to browse
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
