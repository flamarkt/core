<?php

namespace Flamarkt\Core\Extend;

use Flamarkt\Core\Notification\MailConfig;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Contracts\Container\Container;

class Mail implements ExtenderInterface
{
    protected ?string $templateView = null;
    protected $themeColor;
    protected $brand;
    protected array $css = [];

    /**
     * Change the entire layout view used by Flamarkt emails.
     * @param string $view Fully qualified view name
     * @return $this
     */
    public function template(string $view): self
    {
        $this->templateView = $view;

        return $this;
    }

    /**
     * Change the primary color used for the email inline CSS.
     * @param string|callable $callback A callback or invokable ::class that returns a string that can be inserted as a CSS color.
     * @return $this
     */
    public function themeColor($callback): self
    {
        $this->themeColor = $callback;

        return $this;
    }

    /**
     * Change the logo/link at the top of the email.
     * @param string|callable $callback A callback or invokable ::class that returns a string of HTML.
     * @return $this
     */
    public function brand($callback): self
    {
        $this->brand = $callback;

        return $this;
    }

    /**
     * Add more CSS to the email inline style block.
     * @param string|callable $callback A callback or invokable ::class that returns a string of CSS or null. The class will receive BlueprintInterface|null $blueprint as first argument.
     * @return $this
     */
    public function css($callback): self
    {
        $this->css[] = $callback;

        return $this;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        if ($this->templateView) {
            MailConfig::$templateView = $this->templateView;
        }

        if ($this->themeColor) {
            MailConfig::$themeColorCallback = ContainerUtil::wrapCallback($this->themeColor, $container);
        }

        if ($this->brand) {
            MailConfig::$brandCallback = ContainerUtil::wrapCallback($this->brand, $container);
        }

        foreach ($this->css as $css) {
            MailConfig::$cssCallbacks[] = ContainerUtil::wrapCallback($css, $container);
        }
    }
}
