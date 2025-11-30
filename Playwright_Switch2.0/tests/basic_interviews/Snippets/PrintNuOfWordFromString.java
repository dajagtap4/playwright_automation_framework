public class PrintNuOfWordFromString {
      public static void main(String[] args) {
       String name = "I have  experience in Selenium using   java        for test  automation";

            // Trim the string and replace multiple spaces with single space
            String cleaned = name.replaceAll("\\s+", " ");
            
            // Split words by space
            String[] words = cleaned.split(" ");

            // Count the words
            int count = words.length;

            System.out.println("Word count = " + count);
    }
}
