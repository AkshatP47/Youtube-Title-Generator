script>
    document.getElementById("generate-button").addEventListener("click", function(e){
        e.preventDefault();
        
        var generateButton = document.getElementById("generate-button");
        
        if (generateButton.disabled) {
            return; // Prevent multiple clicks while content is being generated
        }
        
        generateButton.disabled = true;
        
        var topic = document.getElementById('topic').value;
        var youtubeTitleGeneratorPrompt = "As an expert YouTuber with 10 Years of Experience. Your task is to generate 10 YouTube video titles based on the " + topic + " and ensure a high CTR for my upcoming video. First, use your expertise to develop the first 5 titles, ensuring they are engaging, accurately represent the video content, and abide by YouTube's optimal practices for high CTR. For the remaining five, pick 5 templates that best fit the video's theme from the given list and use them to craft the titles.\n\nTemplates List:\n-How To Not (Unwanted Outcome)-(Encouraging Words)!!\n-The Simple (Task) that (Defeated) EVERYONE Except (Authority Figure)\n-6 TOP (Objects) to Save You From (Unwanted Event)\n-[Achieve Goal] on [Platform] (easy [Activity] for beginners!)\n-Building My (Ultimate Goal) For/With (Constraint)\n-(Problem)? 4 Common Mistakes To Avoid\n-Asking Strangers Their Thoughts On (Subject)\n-A (Tool) a day to get (Goal) to stay?? | (Solution) for (Problem)\n-(Activity) When Something Wild Happened!\n-100 Most Common [Objects] ([Support For Objects])\n-6 Reasons (Pain Point)\n- 7 NEW (Place or Object) HACKS - PUT TO THE TEST!\n-(Activity) The World's Best (Object) in (Place) " + topic;
        var loading = document.getElementById('loading');
        var result = document.getElementById('result-wrapper'); // Changed to result-wrapper
        var resultC = document.getElementById('result-container');

        loading.style.display = 'block';
        result.style.display = 'none'; // hide result wrapper
        resultC.style.display = 'none';

        var formData = new FormData();
        formData.append('action', 'openai_generate_text');
        formData.append('prompt', youtubeTitleGeneratorPrompt);

        fetch('/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            if(data.success) {
                result.innerText = data.data.choices[0].message.content;
                result.style.display = 'block'; // show result wrapper
                resultC.style.display = 'block';
                generateButton.disabled = false;
            } else {
                result.innerText = 'An error occurred: ' + data.data;
                result.style.display = 'block'; // show result wrapper
                resultC.style.display = 'block';
                generateButton.disabled = false;
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            result.innerText = 'An error occurred: ' + error.message;
            result.style.display = 'block'; // show result wrapper
            resultC.style.display = 'block';
            generateButton.disabled = false;
        });
    });
    
    var copyAllButton = document.getElementById('copy-all-button');
    copyAllButton.addEventListener('click', function () {
        var result = document.getElementById('result-wrapper');
        var tempTextArea = document.createElement('textarea');
        tempTextArea.value = result.innerText;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        alert('Copied to clipboard!');
    });
</script>
